public with sharing class ApprovalRequestController {
    @AuraEnabled(cacheable=true)
    public static List<ProcessInstanceWorkitem> getApprovalRequests() {
        String currentUserId = UserInfo.getUserId();
        List<ProcessInstanceWorkitem> approvalRequests = new List<ProcessInstanceWorkitem>();
        approvalRequests = [SELECT Id, ProcessInstance.TargetObject.Name, ProcessInstance.Status FROM ProcessInstanceWorkitem WHERE ActorId =: currentUserId];
        return approvalRequests;
    }
    @AuraEnabled
    public static void approveApprovalRequest(String requestId){
        Approval.ProcessWorkitemRequest req = new Approval.ProcessWorkitemRequest();
        req.setComments('Approved');
        req.setAction('Approve');
        req.setWorkitemId(requestId);
        Approval.ProcessResult result = Approval.process(req);
    }
    @AuraEnabled
    public static void rejectApprovalRequest(String requestId){
        Approval.ProcessWorkitemRequest req = new Approval.ProcessWorkitemRequest();
        req.setComments('Rejected');
        req.setAction('Reject');
        req.setWorkitemId(requestId);
        Approval.ProcessResult result = Approval.process(req);
    }
    @AuraEnabled
    public static void approveAllApprovalRequest(){
        List<ProcessInstanceWorkitem> approvalRequestList = getApprovalRequests();
        for (ProcessInstanceWorkitem item : approvalRequestList){
            Approval.ProcessWorkitemRequest req = new Approval.ProcessWorkitemRequest();
            req.setComments('Approved');
            req.setAction('Approve');
            req.setWorkitemId(item.id);
            Approval.ProcessResult result = Approval.process(req);
        }
    }
    @AuraEnabled
    public static void rejectAllApprovalRequest(){
        List<ProcessInstanceWorkitem> approvalRequestList = getApprovalRequests();
        for (ProcessInstanceWorkitem item : approvalRequestList){
            Approval.ProcessWorkitemRequest req = new Approval.ProcessWorkitemRequest();
            req.setComments('Rejected');
            req.setAction('Reject');
            req.setWorkitemId(item.id);
            Approval.ProcessResult result = Approval.process(req);
        }
    }
}