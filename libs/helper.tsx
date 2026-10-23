import moment from "moment";

export const calculateAge = (
  day: number,
  month: string,
  year: number
): number => {
  const dob = moment(`${month} ${day}, ${year}`, "MMMM DD, YYYY");
  const currentDate = moment();
  return currentDate.diff(dob, "years");
};

export const renderTitle = (selectedTab: number) => {
  switch (selectedTab) {
    case 1:
      return "Services";
    case 2:
      return "Interest";
    case 3:
      return "Fetish";
    case 4:
      return "Languages";
    case 5:
      return "BodyHair";
    case 6:
      return "Build";
    case 7:
      return "Drugs";
    case 8:
      return "Ethnicity";
    case 9:
      return "Height";
    case 10:
      return "Position";
    case 11:
      return "Sexuality";
    case 12:
      return "Size";
    case 13:
      return "Smoking";
    case 14:
      return "Age";
    case 15:
      return "Cut UnCut";
    case 16:
      return "Safer Sex";
    default:
      return "";
  }
};

export const renderTab = () => {
  return [
    "Services",
    "Interest",
    "Fetish",
    "Languages",
    "BodyHair",
    "Build",
    "Drugs",
    "Ethnicity",
    "Height",
    "Position",
    "Sexuality",
    "Size",
    "Smoking",
    "Age",
    "Cut UnCut",
    "Safer Sex",
  ];
};
