import { addCorsHeaders } from "../helpers/CorsHeader";
import { SupportModel, type Support } from "../models/Support.Schema";
import { UserModel } from "../models/User.models";
import { sendSupportEmails } from "../utils";

// create a new support center
export async function createSupport(req: Request) {
  try {
    const formData = await req.formData();
    const ticketInfoData = formData.get("ticketInfo");
    const ticketInfo = ticketInfoData
      ? JSON.parse(ticketInfoData.toString())
      : {};
    const userUid = formData.get("userInfo");
    const status = formData.get("status") || "open";
    const imageFile = formData.get("image");

    let accessToken = null;
    // if (req.headers.get("Authorization")) {
    //   accessToken = req.headers.get("Authorization");
    // }

    const { title, description } = ticketInfo;

    let imagePath = null;

    if (imageFile instanceof File) {
      imagePath = `uploads/${imageFile.name}`;
      await Bun.write(imagePath, imageFile);
    }

    // Validate required fields
    if (!title || !description || !userUid || !imagePath) {
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
        })
      );
    }

    // Fetch the user by `userUid` to verify their existence and role
    const user = await UserModel.findOne({ userUid });

    if (!user) {
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
        })
      );
    }

    // Determine `assignedTo`
    let assignedTo;
    let adminEmail = "eriag321@gmail.com";
    if (user.role === "admin") {
      assignedTo = user.email;
    } else {
      const adminUser = await UserModel.findOne({ role: "admin" });
      assignedTo = adminUser ? adminUser.email : "defaultAdminUid";
      if (adminUser?.email) {
        adminEmail = adminUser?.email;
      }
    }

    // Create the support ticket
    const newTicket = new SupportModel({
      ticketInfo: { title, description },
      userInfo: userUid,
      status,
      assignedTo,
      image: `http://localhost:3000/` + imagePath,
    });

    await newTicket.save();

    // Sending emails to both user and admin
    // if (accessToken) {
    sendSupportEmails(
      user.email as string,
      adminEmail,
      title,
      description,
      assignedTo as string,
    );
    // }

    return addCorsHeaders(
      new Response(JSON.stringify({ support: newTicket }), {
        status: 201,
      })
    );
  } catch (error) {
    console.error("Error creating support ticket:", error);
    return addCorsHeaders(
      new Response(
        JSON.stringify({ error: "Failed to create support ticket" }),
        {
          status: 500,
        }
      )
    );
  }
}

export async function getAllSupportTickets(req: Request) {
  try {
    const tickets = await SupportModel.find({});

    return addCorsHeaders(
      new Response(JSON.stringify({ tickets }), {
        status: 200,
      })
    );
  } catch (error) {
    console.error("Error fetching support tickets:", error);
    return addCorsHeaders(
      new Response(
        JSON.stringify({ error: "Failed to fetch support tickets" }),
        {
          status: 500,
        }
      )
    );
  }
}

export async function getSupportTicketById(req: Request) {
  try {
    const url = new URL(req.url);
    const ticketId = url.searchParams.get("id");
    const ticket = await SupportModel.findById(ticketId);

    if (!ticket) {
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "Support ticket not found" }), {
          status: 404,
        })
      );
    }

    return addCorsHeaders(
      new Response(JSON.stringify({ ticket }), {
        status: 200,
      })
    );
  } catch (error) {
    console.error("Error fetching support ticket:", error);
    return addCorsHeaders(
      new Response(
        JSON.stringify({ error: "Failed to fetch support ticket" }),
        {
          status: 500,
        }
      )
    );
  }
}

export async function updateSupportTicket(req: Request) {
  try {
    const url = new URL(req.url);
    const ticketId = url.searchParams.get("uid");
    const data: Partial<Support> = await req.json();

    const updatedTicket = await SupportModel.findByIdAndUpdate(ticketId, data, {
      new: true,
    });

    if (!updatedTicket) {
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "Support ticket not found" }), {
          status: 404,
        })
      );
    }

    return addCorsHeaders(
      new Response(JSON.stringify({ ticket: updatedTicket }), {
        status: 200,
      })
    );
  } catch (error) {
    console.error("Error updating support ticket:", error);
    return addCorsHeaders(
      new Response(
        JSON.stringify({ error: "Failed to update support ticket" }),
        {
          status: 500,
        }
      )
    );
  }
}

export async function deleteSupportTicket(req: Request) {
  try {
    const url = new URL(req.url);
    const ticketId = url.searchParams.get("uid");
    const deletedTicket = await SupportModel.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "Support ticket not found" }), {
          status: 404,
        })
      );
    }

    return addCorsHeaders(
      new Response(
        JSON.stringify({ message: "Support ticket deleted successfully" }),
        {
          status: 200,
        }
      )
    );
  } catch (error) {
    console.error("Error deleting support ticket:", error);
    return addCorsHeaders(
      new Response(
        JSON.stringify({ error: "Failed to delete support ticket" }),
        {
          status: 500,
        }
      )
    );
  }
}
