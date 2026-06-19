import * as reportRepository from "../repositories/report.repository.js";

export const getDashboardReport = async () => {
  return await reportRepository.getDashboardReport();
};