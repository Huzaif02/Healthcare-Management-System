import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

// POST: Create a new appointment
export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctorId, // Now using doctorId instead of doctor_firstName and doctor_lastName
    hasVisited,
    address,
  } = req.body;

  // Log the incoming request data for debugging
  console.log("Incoming request data:", req.body);

  // Check if all required fields are present and not empty
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctorId ||  // Now checking for doctorId instead of separate names
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // Check if the doctor exists with the given doctorId and department
  const doctor = await User.findById(doctorId).where({
    role: "Doctor",
    doctorDepartment: department,
  });

  if (!doctor) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  const patientId = req.user._id; // Assuming the logged-in user's ID is the patient ID

  // Create the appointment
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor.firstName, // Populate doctor details from the database
      lastName: doctor.lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });

  // Respond with success
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment created successfully!",
  });
});

// GET: Get all appointments
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

// PUT: Update an appointment status by ID
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);

    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }

    // Update the appointment status
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
    });
  }
);

// DELETE: Delete an appointment by ID
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }

  // Delete the appointment
  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});
