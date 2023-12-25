// Import necessary modules
const express = require("express");
const router = express.Router();
const vision = require("@google-cloud/vision");
const multer = require("multer");
const Ocr = require("../model/ocrSchema");
const User = require("../model/userSchema");
// Set up multer to store files in memory
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Route for detecting OCR information in an uploaded image(And create ocr in db)
router.post("/detect", upload.single("image"), async (req, res) => {
  const email = req.body.email;
  const image = req.file;
  //console.log(email);
  //console.log(image);
  try {
    // Google Cloud Vision API configuration
    const CREDENTIALS = {
      type: "service_account",
      project_id: "ocr-detection-409009",
      private_key_id: "98acd50fb390f753e873c5d4a34c71d210eceed5",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQChzVXfBEAnUNEM\nFK8swX8H3ThAOgEuECe2c06YM6Sw/tAywVK7WIuISF95rsU8N7JnogCXJIMUoHqa\n0Ixzy4S7x0HGIyeY6RNLOA6vmsgXdoO8lUygR+XMruZjY2yDVBPoysA2aJ1CtZG5\nLGY6JkvDJJCo6V0fLvFIMJnsyRpm0RY8jDxChRiCIL9xFkl8rEZw6XyIAppfKMl3\nz/Ddb6y+Ua7bkrgbAri68ukU7Zi34gejU0W863FFgtitimbGwedxVU6Bht99KfSB\nOfEXHPOT3gxK3WBkHtzvCkZXL3vgBW/7z5KyEEWbHrYhFFl2RZUQXqD2PuVP/ghe\naRtL3+99AgMBAAECggEAFaXz/c1DSh9ZgOzJjUrsVKCIFKvOGZwmvBYMZ3fNarMF\nJy1PhOpxbNAGGjFEiWyITa5StuY3NYzNKqaJjDqoLTmZNsngU+inYLKE4IDskZsV\nQCeXo4BLIkoqYBTe4Wlf6o8qDX2MwO6rKyPiH5idHWRoiHkEsRXmSXrbNV+ozSWo\n8UX3jB3GhR9X7GvnZOJHQ7TgUW39ymJ90ZNfOnzaNdTomLI1SMaDDM+R1M5Py/ZN\n8OoCMSYTbIwOLYCAWglsNWs9nq8fS6VonX3wuH98z4rpy9UglyX0Vsl3IeCVOG5r\nPSB4hDZPj4XlMbQkFC5+uYAH37PelNHFn1q6s0o3PwKBgQDXCrz0FeIjpVzhkmuy\nsV4vRBShTTzHaTtUDlyhQ05Xvy7xkmdg7BMzk1QyxZqBIKr8WUTHP5ZSd0Vs6yw7\nb8vFWf0bRWjVO+fqUxd0mvxJ+SZhDrCOftvSi753Xcb2GbadYQaRuyTpSExeV9bE\n5ByzFeTzWTpF2JPsbryjBmvGYwKBgQDAnqrdqsQTIFtCFwS/90Svbf3U12lmSMpf\n2WFNl3iXYbIp+i/Sl8SI9JF7g5DLLaQ1ZbTGA4V6/I8eJD2A/3gpkeERLjpUvTr3\ngzzbrabKtgmu+sAZMoL6mcfNxGmOX01qlHzI8qH4UclYKanI8Cb1ZL05tyBSMf34\nk67rriLonwKBgEHmdImIu0iZQKGQMZkNagOqJXhZJyslQJ092X1CFxwk5sn5R90X\n+7puh/sXO4Ye8Mdsw/sbrYGQM6JxX5jHZfcQ4NQerUXLmgLhe+qsJGy3Ad/0lH7W\nuZ8IXFJQVszMjH4mYdD/PQyQr3aqDJNCJNls+EDrM0R8XriyJvT+3sBpAoGAaDJs\nw9SolKAgPbQuAZpFMZESipysi4Q81XTGSi7yMRHMSyDn1cf7rQp/2IznOsHJ3ojS\nLXuiLVGKKgf4rVuFKRec5KpZK5Xh3BrGRR++5lFrE5jZacgFSoL9rrXdVAMB4fHJ\nPvrh226CuIpxKh2fNYf1RM9nUI9yj5F0QlHE2IkCgYAnFB5qwGEtVwRXDl5Oj+Jf\n9fd/BPN4qch90sSqxEebqLx0f+WNpxH9dymYsEVbqDZA8vz3COYqUr4dnJIrfc7x\nLBSpCfUv0j+rumaGG03U6JETGwksqXL29aob7IPpx3G3WEAczF32UTg1fmafwAuJ\nr2WEu7uEK6hYWJ+dZRaKwQ==\n-----END PRIVATE KEY-----\n",
      client_email:
        "saransh-mittal@ocr-detection-409009.iam.gserviceaccount.com",
      client_id: "117442827014572188658",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/saransh-mittal%40ocr-detection-409009.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };

    const config = {
      credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email,
      },
    };
    const client = new vision.ImageAnnotatorClient(config);

    // Use Google Cloud Vision API to detect text in the image
    const [result] = await client.textDetection(image.buffer);
    const detections = result.textAnnotations;

    // Extract information from OCR data
    const data = detections[0].description.split("\n");
    const identification_number = data[1];
    const name = data[5].replace("Name ", "");
    const last_name = data[6].replace("Last name ", "");
    let dob = data[8];
    dob = dob.replace("Date of Birth ", "");
    let date = new Date(dob);
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let year = date.getFullYear();
    let newDate = day + "/" + month + "/" + year;
    const dateOfBirth = newDate;

    let doi = data[14];
    const expectedFormat = "dd MMM yyyy";
    let cleanedDateString = doi.slice(0, expectedFormat.length + 1);
    // Parse the date
    date = new Date(cleanedDateString);
    day = String(date.getDate()).padStart(2, "0");
    month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    year = date.getFullYear();
    newDate = day + "/" + month + "/" + year;
    // Format the date
    const dateOfIssue = newDate;

    let doe = data[21];
    cleanedDateString = doe.slice(0, expectedFormat.length + 1);
    date = new Date(cleanedDateString);
    day = String(date.getDate()).padStart(2, "0");
    month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    year = date.getFullYear();
    newDate = day + "/" + month + "/" + year;
    const dateOfExpiry = newDate;

    // console.log(
    //   identification_number,
    //   name,
    //   last_name,
    //   dateOfBirth,
    //   dateOfIssue,
    //   dateOfExpiry
    // );
    const user = await User.findOne({ email });
    const ocr = await Ocr.findOne({ identification_number });
    if (ocr) {
      ocr.name = name;
      ocr.last_name = last_name;
      ocr.dateOfBirth = dateOfBirth;
      ocr.dateOfIssue = dateOfIssue;
      ocr.dateOfExpiry = dateOfExpiry;
      ocr.active = true;
      await ocr.save();
      // Check if the OCR data already exists for the user
      if (!user.ocrs.includes(ocr._id)) {
        user.ocrs.push(ocr._id);
        await user.save();
      }
      // Return the OCR data in the response
      return res.status(201).json(ocr);
    }

    //Else Create new OCR data and associate it with the user
    const newOcr = new Ocr({
      identification_number,
      name,
      last_name,
      dateOfBirth,
      dateOfIssue,
      dateOfExpiry,
      active: true,
    });
    await newOcr.save();

    user.ocrs.push(newOcr._id);
    await user.save();

    // Return the OCR data in the response
    return res.status(201).json(newOcr);
  } catch (error) {
    // Handle errors during OCR detection
    console.log(error.message);
    res.status(422).json({ error: error.message });
  }
});

// Route for updating OCR data by ID
router.put("/update/:id", async (req, res) => {
  // Extract OCR ID and updated data from request body
  const ocrId = req.params.id;
  const {
    name,
    last_name,
    dateOfBirth,
    dateOfIssue,
    dateOfExpiry,
    identification_number,
  } = req.body;

  try {
    // Update OCR data in the database
    const updatedOcr = await Ocr.findByIdAndUpdate(
      ocrId,
      {
        $set: {
          name,
          last_name,
          dateOfBirth,
          dateOfIssue,
          dateOfExpiry,
          identification_number,
        },
      },
      { new: true }
    );

    // Return the updated OCR data in the response
    res.status(201).json(updatedOcr);
  } catch (error) {
    // Handle errors during OCR data update
    console.error(error.message);
    res.status(422).json({ error: "ocr updation failed" });
  }
});

// Search can be done on frontend also . So did it on frontend
// router.get("/search", async (req, res) => {
//   const {
//     name,
//     last_name,
//     dateOfBirth,
//     dateOfIssue,
//     dateOfExpiry,
//     active,
//     identification_number,
//     /* Add other fields if needed */
//   } = req.query;
//   console.log(req.query);
//   try {
//     const query = {};

//     if (name) {
//       query.name = new RegExp(name, "i"); // Case-insensitive partial match
//     }

//     if (last_name) {
//       query.last_name = new RegExp(last_name, "i"); // Case-insensitive partial match
//     }

//     if (dateOfBirth) {
//       query.dateOfBirth = new RegExp(dateOfBirth, "i"); // Case-insensitive partial match
//     }

//     if (dateOfIssue) {
//       query.dateOfIssue = new RegExp(dateOfIssue, "i"); // Case-insensitive partial match
//     }

//     if (dateOfExpiry) {
//       query.dateOfExpiry = new RegExp(dateOfExpiry, "i"); // Case-insensitive partial match
//     }

//     if (active !== "") {
//       query.active = active.toLowerCase() === "true"; // Convert to boolean
//     }

//     if (identification_number) {
//       query.identification_number = new RegExp(identification_number, "i"); // Case-insensitive partial match
//     }

//     // Add other fields if needed
//     //console.log("Query:", query);
//     const searchResults = await Ocr.find(query);

//     res.status(201).json(searchResults);
//   } catch (error) {
//     console.error(error);
//     res.status(422).json({ error: "Search Failed" });
//   }
// });

// Route for soft-deleting OCR data by ID
router.put("/soft-delete/:id", async (req, res) => {
  // Extract OCR ID from request parameters
  const ocrId = req.params.id;
  //console.log(ocrId);
  try {
    // Soft-delete OCR data in the database
    const updatedOcr = await Ocr.findByIdAndUpdate(
      ocrId,
      { $set: { active: false } },
      { new: true }
    );

    // Return the updated OCR data in the response
    res.status(201).json(updatedOcr);
  } catch (error) {
    // Handle errors during OCR soft-deletion
    console.error(error);
    res.status(422).json({ error: "Deletion of ID failed" });
  }
});

// router.put("/reactivate/:id", async (req, res) => {
//   const ocrId = req.params.id;

//   try {
//     const updatedOcr = await Ocr.findByIdAndUpdate(
//       ocrId,
//       { $set: { active: true } },
//       { new: true }
//     );

//     res.status(201).json(updatedOcr);
//   } catch (error) {
//     console.error(error);
//     res.status(422).json({ error: "Reactivation of ID failed" });
//   }
// });

// Route for deleting OCR data by ID
// router.delete("/ocr/:id", async (req, res) => {
//   try {
//     const ocrId = req.params.id;

//     // Find the OCR data to be deleted
//     const ocrToDelete = await Ocr.findById(ocrId);

//     if (!ocrToDelete) {
//       return res.status(404).json({ error: "OCR not found" });
//     }

//     // Find all users with the specified OCR in their ocrs array
//     const users = await User.find({ ocrs: ocrId });

//     if (!users || users.length === 0) {
//       return res
//         .status(404)
//         .json({ error: "No users found with the specified OCR" });
//     }

//     // Update each user by removing the OCR from their ocrs array
//     await Promise.all(
//       users.map(async (user) => {
//         user.ocrs = user.ocrs.filter((id) => id.toString() !== ocrId);
//         await user.save();
//       })
//     );

//     // Delete the OCR data
//     await ocrToDelete.remove();

//     return res
//       .status(200)
//       .json({ message: "OCR deleted and users updated successfully" });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(422)
//       .json({ error: "Error deleting OCR record from database" });
//   }
// });
module.exports = router;
