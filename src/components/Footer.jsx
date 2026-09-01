export default function Footer () {
    return (
        <footer className="w-full h-[40px] bg-sidebar-accent p-1">
            <div>
                <div className="">
                    © {new Date().getFullYear()} Copyright Text
                    <a className="grey-text text-lighten-4 right" href="#">No More Links</a>
                </div>
            </div>
        </footer>
    )
}