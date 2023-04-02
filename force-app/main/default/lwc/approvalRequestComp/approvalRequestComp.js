import { LightningElement,wire } from "lwc";
import getApprovalRequests from "@salesforce/apex/ApprovalRequestController.getApprovalRequests";
import approveApprovalRequest from "@salesforce/apex/ApprovalRequestController.approveApprovalRequest";
import rejectApprovalRequest from "@salesforce/apex/ApprovalRequestController.rejectApprovalRequest";
import approveAllApprovalRequest from "@salesforce/apex/ApprovalRequestController.approveAllApprovalRequest";
import rejectAllApprovalRequest from "@salesforce/apex/ApprovalRequestController.rejectAllApprovalRequest";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class ApprovalRequestComp extends LightningElement {
  approvalRequests = [];

  @wire(getApprovalRequests)
  wiredApprovalRequests({ error, data }) {
    if (data) {
      this.approvalRequests = data;
    } else if (error) {
      console.error(error);
    }
  }

  handleApproval(event) {
    let requestId = event.currentTarget.dataset.id;
    approveApprovalRequest({ requestId })
      .then(() => {
        this.showToast("Success", "Approval request approved", "success");
      })
      .catch((error) => {
        this.showToast("Error", error.body.message, "error");
      });
  }

  handleRejection(event) {
    let requestId = event.currentTarget.dataset.id;
    rejectApprovalRequest({ requestId })
      .then(() => {
        this.showToast("Success", "Approval request rejected", "success");
      })
      .catch((error) => {
        this.showToast("Error", error.body.message, "error");
      });
  }

  handleApproveAll() {
    approveAllApprovalRequest({  })
      .then(() => {
        this.showToast("Success", "All Approval request approved", "success");
      })
      .catch((error) => {
        this.showToast("Error", error.body.message, "error");
      });
  }

  handleRejectAll() {
    rejectAllApprovalRequest({  })
      .then(() => {
        this.showToast("Success", "All Approval request rejected", "success");
      })
      .catch((error) => {
        this.showToast("Error", error.body.message, "error");
      });
  }

  showToast(title, message, variant) {
    const toastEvent = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(toastEvent);
  }
}