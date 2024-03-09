import mongoose, {Document} from 'mongoose';

interface IUser extends Document {
    username: string
    email: string;
    password: string;
    isAvatarImageSet: boolean;
    avatarImage: string;
}

const UserSchema = new mongoose.Schema<IUser>({
    username:{
        unique: true,
        max: 20,
        type: String,
        required: true
    },
    email:{
        unique: true,
        max: 50,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    isAvatarImageSet: {
        type: Boolean,
        required: false,
        default: false
    },
    avatarImage: {
        type: String,
        required: false,
        default: ""
    }
},{
    timestamps: true
}
)

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel