import { ThemeToggleButton } from './DarkMode'

export function Navbar(){
    const links = [
        {
            title:"Dashboard",
            href:"#"
        },{
            title:"Tasks",
            href:"#"
        },{
            title:"Study Tracker",
            href:"#"
        },{
            title:"Analytics",
            href:"#"
        },{
            title:"Settings",
            href:"#"
        }
    ];
    return(
        <div className="flex justify-between items-center p-4">
            <p className="text-lg font-bold text-[rgb(var(--pritext))]">StudyFlow</p>
            <div className="flex justify-between items-center gap-4 font-mono text-[rgb(var(--pritext))]/80">
                {links.map((link,indx)=>{
                    return(
                        <a className="transition hover:bg-sky-400" href={link.href} key={link.title}>{link.title}</a>
                    );
                })}
            </div>
            <ThemeToggleButton/>
           
        </div>
        
    );
}