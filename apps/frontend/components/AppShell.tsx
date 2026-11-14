import Nav from './Nav';export default function AppShell({children}:{children:React.ReactNode}){return <><Nav/><main className="shell">{children}</main></>}
