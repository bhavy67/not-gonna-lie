import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    
    // Add debugging logs
    console.log('Verification attempt:', { 
      originalUsername: username, 
      decodedUsername, 
      code 
    });
    
    let user = await UserModel.findOne({ username: decodedUsername });
    
    if (!user) {
      // Try to find user by case-insensitive search
      user = await UserModel.findOne({ 
        username: { $regex: new RegExp(`^${decodedUsername}$`, 'i') } 
      });
      
      if (!user) {
        console.log('No user found with username:', decodedUsername);
        // Let's also try to find any users to debug
        const allUsers = await UserModel.find({}, 'username email').limit(5);
        console.log('Available users:', allUsers);
        
        return Response.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }
      
      console.log('Found user with case-insensitive search:', user.username);
    }

    console.log('User found:', { 
      username: user.username, 
      email: user.email,
      verifyCode: user.verifyCode,
      verifyCodeExpiry: user.verifyCodeExpiry,
      isVerified: user.isVerified 
    });

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

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
