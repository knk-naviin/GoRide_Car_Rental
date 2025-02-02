const nodemailer = require('nodemailer');

const sendBookingEmail = async (bookingDetails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: '🚗 New Car Booking Confirmation - GoRide Car Rental',
   html: `
      <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; background-color: #f8f9fa; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
        
        <!-- Header with Logo -->
        <div style="background-color: #0a66c2; padding: 20px; text-align: center;">
          <img src="https://res.cloudinary.com/dgroxj0su/image/upload/v1738490354/car-rental/company-logo.png" alt="GoRide Logo" style="max-width: 150px;"/>
          <h2 style="color: #fff; margin-top: 10px; font-size: 22px;">Booking Confirmation</h2>
        </div>

        <!-- Booking Summary -->
        <div style="padding: 20px;">
          <p style="font-size: 16px; color: #333;">Hello <strong>${bookingDetails.name}</strong>,</p>
          <p style="font-size: 16px; color: #333;">Your car rental booking request has been received. Below are the details:</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 10px; background-color: #f1f1f1; font-weight: bold;">Booking ID</td>
              <td style="padding: 10px;">${bookingDetails._id}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #f1f1f1; font-weight: bold;">Car ID</td>
              <td style="padding: 10px;">${bookingDetails.carId}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #f1f1f1; font-weight: bold;">From Date</td>
              <td style="padding: 10px;">${new Date(bookingDetails.fromDate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #f1f1f1; font-weight: bold;">To Date</td>
              <td style="padding: 10px;">${new Date(bookingDetails.toDate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #f1f1f1; font-weight: bold;">Total Days</td>
              <td style="padding: 10px;">${bookingDetails.totalDays}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #f1f1f1; font-weight: bold;">Status</td>
              <td style="padding: 10px; color: ${bookingDetails.status === 'pending' ? 'orange' : 'green'};">
                <strong>${bookingDetails.status.toUpperCase()}</strong>
              </td>
            </tr>
          </table>

          <!-- Customer Information -->
          <h3 style="color: #333; margin-top: 20px; text-align: center;">👤 Customer Details</h3>
          <p style="text-align: center;"><strong>Name:</strong> ${bookingDetails.name}</p>
          <p style="text-align: center;"><strong>Phone Number:</strong> ${bookingDetails.phoneNumber}</p>
          <p style="text-align: center;"><strong>Current Address:</strong> ${bookingDetails.currentAddress}</p>

          <!-- Documents Section -->
          <h3 style="color: #333; margin-top: 20px; text-align: center;">📜 Uploaded Documents</h3>

          <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 15px; margin-top: 10px;">
            <div style="text-align: center;">
              <p><strong>Aadhar Front</strong></p>
              <img src="${bookingDetails.aadharFront}" alt="Aadhar Front" style="width: 250px; height: 140px; border-radius: 10px; border: 2px solid #ddd;"/>
            </div>
            <div style="text-align: center;">
              <p><strong>Aadhar Back</strong></p>
              <img src="${bookingDetails.aadharBack}" alt="Aadhar Back" style="width: 250px; height: 140px; border-radius: 10px; border: 2px solid #ddd;"/>
            </div>
          </div>

          <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 15px; margin-top: 20px;">
            <div style="text-align: center;">
              <p><strong>License Front</strong></p>
              <img src="${bookingDetails.drivingLicenseFront}" alt="License Front" style="width: 250px; height: 140px; border-radius: 10px; border: 2px solid #ddd;"/>
            </div>
            <div style="text-align: center;">
              <p><strong>License Back</strong></p>
              <img src="${bookingDetails.drivingLicenseBack}" alt="License Back" style="width: 250px; height: 140px; border-radius: 10px; border: 2px solid #ddd;"/>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #0a66c2; padding: 15px; text-align: center; color: white;">
          <p>🚗 <strong>GoRide Car Rental</strong> | Reliable Rides, Anytime!</p>
          <p>📍 Chennai, India | 📞 +91-9876543210</p>
          <p>&copy; ${new Date().getFullYear()} GoRide. All Rights Reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendBookingEmail };
