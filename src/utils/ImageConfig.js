import fileDefault from "../assets/images/file-blank-solid-240.png";
import filePdf from "../assets/images/file-pdf-solid-240.png";
import fileImg from "../assets/images/image.png";
import fileDoc from "../assets/images/docx.png";
import fileExcel from "../assets/images/excel.png";

export const ImageConfig = {
  default: fileDefault,
  pdf: filePdf,
  png: fileImg,
  jpg: fileImg,
  jpeg: fileImg,
  docx: fileDoc,
  "vnd.openxmlformats-officedocument.wordprocessingml.document": fileDoc,
  xlsx: fileExcel,
  "vnd.openxmlformats-officedocument.spreadsheetml.sheet": fileExcel,
};
