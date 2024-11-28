import { addCorsHeaders } from "../helpers/CorsHeader";
import { UserModel, type User } from "../models";

export const getUser = async (userUid: string): Promise<User | null> => {
  if (!userUid) {
    return null;
  }
  const user: User | null = await UserModel.findOne({ userUid });

  if (!user) {
    return null;
  }
  return user;
};

export const gerUserHandler = async (
  userUid: string,
  retrieveUser: (userUid: string) => Promise<User | null>
): Promise<Response> => {
  if (!userUid) {
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "User Id not found",
        })
      )
    );
  }

  const user = await retrieveUser(userUid);

  if (!user) {
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "User not found",
        }),
        { status: 404 }
      )
    );
  }

  return addCorsHeaders(
    new Response(
      JSON.stringify({
        message: "User Found",
        user,
      }),
      {
        status: 200,
      }
    )
  );
};
