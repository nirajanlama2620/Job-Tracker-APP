import * as reportService from "../services/report.service.js";

export const dashboardReport = async ( req, res ) => {
  try {
    const report = await reportService.getDashboardReport();

    res.status(200).json({ success: true, data: report, });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};