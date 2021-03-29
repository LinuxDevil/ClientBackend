export class Constants {
  STATUS = {
    SUCCESS: 1,
    FAIL: 0,
  };

  MESSAGES_SUCCESS = {
    created: 'Created Successfuly',
    deleted: 'Deleted Successfuly',
    updated: 'Updated Successfuly',
    retreive: 'Retreived Successfuly',
    success: 'Success',
  };

  MESSAGES_FAIL = {
    created: 'Create Failed',
    deleted: 'Delete Failed',
    updated: 'Update Failed',
    retreive: 'Retreive Failed',
    failure: 'Failed',
  };

  PREMADE_STATUS = {
    Success_Alone: {
      status: this.STATUS.SUCCESS,
      message: this.MESSAGES_SUCCESS.success,
    },
    Success_Created: {
      status: this.STATUS.SUCCESS,
      message: this.MESSAGES_SUCCESS.created,
    },
    SUCCESS_DELETED: {
      status: this.STATUS.SUCCESS,
      message: this.MESSAGES_SUCCESS.deleted,
    },
    SUCCESS_UPDATED: {
      status: this.STATUS.SUCCESS,
      message: this.MESSAGES_SUCCESS.updated,
    },
    SUCCESS_GET: {
      status: this.STATUS.SUCCESS,
      message: this.MESSAGES_SUCCESS.retreive,
    },
    Fail_Alone: {
      status: this.STATUS.FAIL,
      message: this.MESSAGES_FAIL.failure,
    },
    Fail_Created: {
      status: this.STATUS.FAIL,
      message: this.MESSAGES_FAIL.created,
    },
    Fail_DELETED: {
      status: this.STATUS.FAIL,
      message: this.MESSAGES_FAIL.deleted,
    },
    Fail_UPDATED: {
      status: this.STATUS.FAIL,
      message: this.MESSAGES_FAIL.updated,
    },
    Fail_GET: {
      status: this.STATUS.FAIL,
      message: this.MESSAGES_FAIL.retreive,
    },
  };
}