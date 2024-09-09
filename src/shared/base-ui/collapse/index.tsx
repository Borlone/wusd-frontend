import { ReactNode } from 'react';

type Props = {
    expand: boolean;
    children?: ReactNode;
};

export default function Collapse({ expand, children }: Props) {
    const templateRows = expand ? 'grid-rows-auto-1fr' : 'grid-rows-auto-0fr';
    return (
        <div className={`grid transition-all duration-400 ${templateRows}`}>
            <div className="overflow-hidden">{children}</div>
        </div>
    );
}
