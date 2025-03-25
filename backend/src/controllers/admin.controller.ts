import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const setAdminStatus = async (req: Request, res: Response) => {
  try {
    const { userId, isAdmin } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { isAdmin },
      { new: true, select: '-password' }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 