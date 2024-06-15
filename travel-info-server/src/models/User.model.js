import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favouriteLocations: {
        type: [String],
        default: [],
    },
});

const User = model("User", userSchema);

export default User;