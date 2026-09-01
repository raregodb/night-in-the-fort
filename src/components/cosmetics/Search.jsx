export default function Search(props) {
    return (
        <div className="w-full h-full flex flex-col justify-items-center items-center">
            <input className={"w-full max-w-[70vw] border-2 border-accent rounded-sm"} onChange={props.onChange} value={props.value}/>
        </div>
    )
}