import axios from "axios";
import axiosConfig from "../axiosConfig";

export const handleRequestForNameFinder = async (name) => {
  let allUserData = null;

  try {
    const responseForAllUserData = await axios.get(`/?name=${name}`);

    if (responseForAllUserData.status === 200) {
      allUserData = {
        totalUsers: responseForAllUserData.data.meta.pagination.total,
        maxPageNumber: responseForAllUserData.data.meta.pagination.pages,
        currentPageNumber: responseForAllUserData.data.meta.pagination.page,
        pageLimit: responseForAllUserData.data.meta.pagination.limit,
        users: responseForAllUserData.data.data
      };
      //console.log('GET axios data:',allUserData );///////////////////
    }
  } catch (error) {
    //console.log("Error in handleRequestForAllUserData: ", error);
  }

  return allUserData;
};