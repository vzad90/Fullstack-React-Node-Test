import {Link} from "react-router";
import {useUserState} from "../store/store.ts";

export default function Header() {
    const userState = useUserState()
    return (
     <header>
         <div>
             <h1><Link to={'/'}>Todo app</Link></h1>
             <nav>
                 <ul>
                     {
                         !userState.user ? (
                             <>
                                 <li><Link to={'/login'}>Login</Link></li>
                                 <li><Link to={'/register'}>Register</Link></li>
                             </>
                         ) :
                             <li><Link to={'/logout'}>Log Out</Link></li>
                     }
                 </ul>
             </nav>
         </div>
     </header>
    )
}