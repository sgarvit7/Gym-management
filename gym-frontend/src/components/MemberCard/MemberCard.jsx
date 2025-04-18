import { Link } from 'react-router-dom';
import dots from './dots.png';


const MemberCard = ({item}) => {
  return (
    <Link to={`/member/${item._id}`} className="bg-white rounded-lg p-3 hover:bg-black hover:text-white cursor-pointer">
      <div className="w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full ">
        <img className="w-full h-full rounded-full" src={item.profilePic} alt="profile" />
        <div className="absolute top-0 left-0"><img src={dots} className='w-6 h-6'/></div>
      </div>
      <div className="mx-auto mt-5 text-center text-xl font-semibold font-mono">
        {item.name}
        <div className="mx-auto text-center text-xl mt-2 font-mono">
          +91 {item.MobileNo}
        </div>
        <div className="mx-auto text-center text-xl mt-2 font-mono">
          Next Bill Date : {item.nextBillDate.slice(0,10).split('-').reverse().join('-')}
        </div>
      </div>
    </Link>
  );
};
export default MemberCard;
