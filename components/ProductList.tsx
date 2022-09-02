import Card from "./Card"

interface Page {
    page: String
}

const ProductList = ({ page }: Page) => {
    return(
        <div className={`flex ${page == "art" && "flex-col items-center justify-center space-y-4"} w-full max-w-4xl ${page == "home" && "space-x-4"} overflow-x-scroll lg:grid lg:grid-cols-3 lg:gap-4 lg:space-x-0 xl:w-auto scrollbar-hide`}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}

export default ProductList