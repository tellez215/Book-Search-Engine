const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models')
const { signToken } = require('../utils/auth');
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findById(context.user._id).select('-password')
                return userData;
            }
            throw new AuthenticationError('Not Logged In!')
        }
    },

    Mutation: {
        createUser: async (parents, args, context) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { user, token };
        },

        login: async (parents, args, context) => {
            const user = await User.findOne({email:args.email})
            if (!user) {
                throw new AuthenticationError('cant find email')
            }
            const correctPw = await user.isCorrectPassword(args.password);
            if (!correctPw) {
                throw new AuthenticationError('Invalid password')
            }
            const token = signToken(user)
            return {user, token};
        },

        saveBook: async (parents, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args.bookData } },
                    { new: true, runValidators: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('Cant find user with this id')
        },

        deleteBook: async (parents, args, context) => {
                if (context.user){
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedBooks: { bookId: args.bookId } } },
                        { new: true }
                      );
                      return updatedUser;
                }
                throw new AuthenticationError('Cant find user with this id')
        }
    }
}


module.exports = resolvers;