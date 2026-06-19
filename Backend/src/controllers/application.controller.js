import * as service from "../services/application.service.js";


export const getApplications = async (req, res) => {
  try {
    const { status, search, } = req.query;

    const applications = await service.getApplications(status, search);

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await service.getApplicationById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createApplication = async (req, res) => {
  try {

    const applicationData = {
      ...req.body,
      employee_id: req.user.id
    };

    const id = await service.createApplication(applicationData);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const updateApplication = async (req, res) => {
//   try {
//     const result = await service.updateApplication(req.params.id, req.body);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Application not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Application updated successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const updateApplication = async (
  req,
  res
) => {
  try {

    const applicationId =
      req.params.id;

    const employerId =
      req.user.id;

    await service.updateApplication(
      applicationId,
      employerId,
      req.body
    );

    res.status(200).json({
      success: true,
      message:
        "Application updated successfully",
    });

  } catch (error) {

    res.status(403).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteApplication = async (req, res) => {
  try {

    const applicationId = req.params.id;
    const employeeId = req.user.id;

    const result =
      await service.deleteApplication(
        applicationId,
        employeeId
      );

     if (result.affectedRows === 0) {
      return res.status(403).json({
        success: false,
        message:
          "Application not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};