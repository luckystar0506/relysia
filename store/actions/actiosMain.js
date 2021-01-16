//Types should be in const to avoid typos and duplication since it's a string and could be easily miss spelled
export const USER_DATA_UPDATE = "USER_DATA_UPDATE";

export const updateUserDataAction = (payload) => {
  return {
    type: USER_DATA_UPDATE,
    payload,
  };
};


  