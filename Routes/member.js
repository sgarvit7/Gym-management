import expresss from 'express';
import auth from '../Auth/auth.js';
import { changeStatus, expiredMember, expiringin3days, expiringin4to7days, getAllMember, getMemberDetails, inActiveMember, monthlyMember, registerMember, searchMember, updateMemberPlan } from '../Controllers/member.js';

const member = expresss.Router();

member.get('/getMembers',auth,getAllMember);
member.post('/registerMember',auth,registerMember);
member.get('/searchMember',auth,searchMember);
member.get('/monthlyMember',auth,monthlyMember);
member.get('/expiringin3days',auth,expiringin3days);
member.get('/expiringin4-7days',auth,expiringin4to7days);
member.get('/expiredMember',auth,expiredMember);
member.get('/inactiveMember',auth,inActiveMember);
member.get('/memberDetails/:id',auth,getMemberDetails);
member.get('/changeStatus/:id',auth,changeStatus);
member.put('/updateMembership/:id',auth,updateMemberPlan);
export default member;