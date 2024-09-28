import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../domain/user.module';
import { User } from '../models/user.model';
import { ExerciseModel } from '../../Excercise/domain/excercise.module';


async function getAllUsers(req: Request, res: Response) {

  try {
    const users = await UserModel.find().select('-password');
    return res.json({
      success: true,
      data: users
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }

}

async function getUserById (req: Request, res: Response) {

  try {

    const { userId } = req.params;
    if( !userId ) return res.json({ success: false, msg: 'Usuario no encontrado' }); 

    const user = await UserModel.findById(userId);
    if (!user) return res.json({ success: false, msg: 'Usuario no encontrado' }); 

    return res.json({ success: true, data: user });

  } catch (error) { return res.json({ success: false, msg: 'Error al obtener usuario' }) }

}

async function saveUser(req: Request, res: Response) {

  try {

    const newUser: User = req.body;

    newUser.password = bcrypt.hashSync(newUser.password, 10);
    const user = new UserModel(newUser);

    await user.save();

    return res.json({
      success: true, data: user, msg: 'Usuario creado exitosamente'
    })

  } catch (error) {
    return res.status(500).json({
      success: false, data: []
    });
  }

}

async function sign(req: Request, res: Response) {

  try {

    const { email, password } = req.body;

    const pendings = [];

    const user = await UserModel.findOne({ email });
    if (!user) return res.json( {success: false, msg: 'Usuario o contraseña incorrectos'} ).status(404);

    const compare = bcrypt.compareSync(password, user.password);
    if (!compare) return res.json({ success: false, msg: 'Usuario o contraseña incorrectos' }).status(404);

    const token = jwt.sign(
      { username: user.email, user_id: user._id },
      process.env.JWT_KEY_APP,
      { expiresIn: '1d' }
    );

    for (const pend of user.pending_exercices) {
      const getter = await ExerciseModel.findById(pend);
      pendings.push(getter);
    }

    return res.json( { success: true, data: [user, pendings, token] } ).status(200);

  } catch (error) { return res.json( { success: false, msg: 'Error interno' } ).status(404) }

}

async function editUser(req: Request, res: Response) {

  try {

    const userData: User = req.body;

    const user = await UserModel.findById(userData._id);
    if (!user) return res.json( { success: false, msg: 'Usuario no encontrado' } ); 

    const editedUser: User = Object.assign(user, req.body);
    await UserModel.findByIdAndUpdate(userData._id, editedUser);

    return res.json({ success: true }).status(200);

  } catch (error) { return res.json({ success: false, msg: 'Error al editar' }) }

}

async function changePassword(req: Request, res: Response) {

  // try {

  //   const { actualPass } = req.body
  //   let { newPass } = req.body
  //   const existingUser = await UserModel.findOne({ _id: res['userData']['user_id'] })
  //     .select('password')

  //   bcrypt.compare(actualPass, existingUser.password, async (err, result) => {
  //     if (!result) { return badResponse(res, 'user_mess_12', '') }

  //     if (err) { return badResponse(res, 'user_mess_12', '') }

  //     newPass = await bcrypt.hash(newPass, 10)

  //     UserModel.updateOne({ _id: res['userData']['user_id'] }, { $set: { password: newPass } })
  //       .then(() => { return goodResponse(res, 'user_mess_11') })
  //       .catch((err) => { return badResponse(res, 'user_mess_12', err) })
  //   })

  // } catch (error) {
  //   return badResponse(res, 'mess_0', error.message)
  // }

}

async function deleteUserById(req: Request, res: Response) {

  try {

    const { userId } = req.params;
    if( !userId ) return res.json({ success: false, msg: 'Usuario no encontrado' }); 

    await UserModel.deleteOne({ _id: userId })

    return res.json({ success: true, msg: 'Usuario eliminado' });

  } catch (error) { return res.json({ success: false, msg: 'Error al eliminar' }) }

}


async function getUserPendingExercises(req: Request, res: Response) {

  try{
      
      const { userId } = req.params;
      if( !userId ) return res.json({ success: false, msg: 'Usuario no encontrado' }); 
  
      const user = await UserModel.findById(userId);
      if (!user) return res.json({ success: false, msg: 'Usuario no encontrado' }); 
  
      const pendings = [];
  
      for (const pend of user.pending_exercices) {
        const getter = await ExerciseModel.findById(pend);
        pendings.push(getter);
      }
  
      return res.json({ success: true, data: pendings });
  }catch{
      return res.json({ success: false, msg: 'Error al obtener ejercicios pendientes' });
  }

}
export const UserControllers = {
    deleteUserById,
    changePassword,
    getUserById,
    getAllUsers,
    editUser,
    saveUser,
    sign,
    getUserPendingExercises
  }