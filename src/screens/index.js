import Login from './ForLogin/Login';
import Signup from './ForLogin/Signup';
import Home from './Home';
import Board from './Board';
import Community from './community/Community';
import Post from './community/Post';
import PostEditor from './community/PostEditor';


/* import ... from './components'; 이렇게 screen디렉토리의 component를 import할때
   경로를 components로 잡기 위해 , 이렇게 하면 javascript는 찾아서 해준다.
   ex) import ... from './components/Image' 을
       import ... from './components' 이렇게만 작성 가능하다
*/

export { Login, Signup, Home, Board, Community, Post, PostEditor };