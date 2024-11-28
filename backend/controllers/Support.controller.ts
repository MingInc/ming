import { addCorsHeaders } from "../helpers/CorsHeader";
import { SupportModel, type Support } from "../models/Support.Schema";
import { UserModel } from "../models/User.models";
import { sendSupportEmails } from "../utils";

/**
 * Creates a new support ticket based on the provided form data. It validates the required fields,
 * processes the uploaded image, and assigns the ticket to an appropriate user (admin or user).
 * It then saves the support ticket in the database and sends emails to the relevant users.
 *
 * @param {Request} req - The HTTP request object that contains the form data for the support ticket.
 *
 * @returns {Promise<Response>} A Promise that resolves to a Response object:
 *   - A `201 Created` response with the newly created support ticket data on success.
 *   - A `400 Bad Request` response if any required fields are missing.
 *   - A `404 Not Found` response if the user specified in the form data is not found.
 *   - A `500 Internal Server Error` response if an error occurs during the ticket creation process.
 */
export async function createSupport(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();
    const ticketInfoData = formData.get("ticketInfo");
    const ticketInfo = ticketInfoData
      ? JSON.parse(ticketInfoData.toString())
      : {};
    const userUid = formData.get("userInfo");
    const status = formData.get("status") || "open";
    const imageFile = formData.get("image");

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
      assignedTo as string
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

/**
 * Fetches all support tickets from the database and returns them in the response.
 * If successful, returns a list of tickets with a 200 status. If an error occurs,
 * it returns a 500 status with an error message.
 *
 * @param {Request} req - The HTTP request object. It does not contain any specific data for fetching all support tickets,
 *                         but may contain headers or other information.
 *
 * @returns {Promise<Response>} A Promise that resolves to a Response object:
 *   - A `200 OK` response with a JSON body containing the list of all support tickets if the operation is successful.
 *   - A `500 Internal Server Error` response if an error occurs while fetching the tickets.
 */
export async function getAllSupportTickets(req: Request) : Promise<Response> {
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

/**
 * Fetches support tickets associated with a specific user based on the provided user ID.
 * Returns a list of tickets in a `200 OK` response if found, or an error message if no tickets are found
 * or if the user ID is missing. Returns a `500 Internal Server Error` status if an error occurs during the process.
 *
 * @param {Request} req - The HTTP request object. The request URL should include a query parameter `id` 
 *                         representing the user ID for fetching associated support tickets.
 *
 * @returns {Promise<Response>} A Promise that resolves to a Response object:
 *   - A `200 OK` response with a JSON body containing the list of support tickets associated with the user if found.
 *   - A `404 Not Found` response if no user ID is provided or if no support tickets are found for the given user.
 *   - A `500 Internal Server Error` response if there is an error fetching the support tickets.
 */
export async function getSupportTicketById(req: Request): Promise<Response>  {
  try {
    const userId = new URL(req.url).searchParams.get("id");

    if (!userId) {
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "User id not found" }), {
          status: 404,
        })
      );
    }

    const tickets = await SupportModel.find({
      userInfo: userId,
    });

    if (!tickets) {
      return addCorsHeaders(
        new Response(JSON.stringify({ error: "Support ticket not found" }), {
          status: 404,
        })
      );
    }

    return addCorsHeaders(
      new Response(JSON.stringify({ tickets }), {
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

/**
 * Deletes a support ticket based on the provided ticket ID in the query string.
 * If the ticket is found and deleted, it returns a success message with a `200 OK` status.
 * If the ticket is not found, it returns an error message with a `404 Not Found` status.
 * If an error occurs during the deletion process, it returns a `500 Internal Server Error` status.
 *
 * @param {Request} req - The HTTP request object. The request URL should include a query parameter `id` representing the ticket ID to be deleted.
 *
 * @returns {Promise<Response>} A Promise that resolves to a Response object:
 *   - A `200 OK` response with a success message if the support ticket was successfully deleted.
 *   - A `404 Not Found` response if the support ticket with the provided ID was not found.
 *   - A `500 Internal Server Error` response if an error occurred during the ticket deletion process.
 */
export async function deleteSupportTicket(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const ticketId = url.searchParams.get("id");
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
