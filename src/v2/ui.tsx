import type { ReactNode } from 'react';
export const human=(s:string)=>s.toLowerCase().replaceAll('_',' ');
export function Badge({children,tone='neutral'}:{children:ReactNode;tone?:string}){return <span className={`badge ${tone}`}>{children}</span>;}
export function Status({value}:{value:string}){return <Badge tone={['suppressed','fail','no_match'].includes(value)?'red':['candidate','pass','match','target_met'].includes(value)?'green':'amber'}>{human(value)}</Badge>;}
export function Heading({eyebrow,title,description,action}:{eyebrow:string;title:string;description:string;action?:ReactNode}){return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;}
export function Stat({label,value,note}:{label:string;value:ReactNode;note:string}){return <div className="stat"><div>{label}</div><strong>{value}</strong><small>{note}</small></div>;}
