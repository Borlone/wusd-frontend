import classNames from 'classnames';

export const Loading = ({ className }: { className?: string }) => {
    return (
        <div className="bounce-loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
