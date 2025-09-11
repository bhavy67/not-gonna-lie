import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    const { username, code, email } = await request.json();
    
    console.log('Verification attempt:', { username, code, email });
    
    // Try to find user by username first, then by email as fallback
    let user = await UserModel.findOne({ username: decodeURIComponent(username) });
    
    if (!user && email) {
      user = await UserModel.findOne({ email });
      console.log('Found user by email instead of username');
    }
    
    if (!user) {
      // Try case-insensitive username search
      user = await UserModel.findOne({ 
        username: { $regex: new RegExp(`^${decodeURIComponent(username)}$`, 'i') } 
      });
      
      if (user) {
        console.log('Found user with case-insensitive username search');
      }
    }
    
    if (!user) {
      console.log('No user found. Available users:');
      const allUsers = await UserModel.find({}, 'username email').limit(5);
      console.log(allUsers);
      
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    console.log('User found:', { 
      username: user.username, 
      email: user.email,
      verifyCode: user.verifyCode,
      submittedCode: code,
      isVerified: user.isVerified 
    });

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    console.log('Verification check:', { isCodeValid, isCodeNotExpired });

    if (isCodeValid && isCodeNotExpired) {
      // Update the user's verification status
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: 'Account verified successfully' },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      // Code has expired
      return Response.json(
        {
          success: false,
          message:
            'Verification code has expired. Please sign up again to get a new code.',
        },
        { status: 400 }
      );
    } else {
      // Code is incorrect
      return Response.json(
        { success: false, message: 'Incorrect verification code' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return Response.json(
      { success: false, message: 'Error verifying user' },
      { status: 500 }
    );
  }
}
