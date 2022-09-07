import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"

const RecommendedCard = ({ image, description, price, slug, title, id }) => {
    
    {
        //const cartItem provides static data for our testing
    }
    const { data: session } = useSession()
    const customer_name = session?.user?.name
    const customer_id = session?.user?.id
    const customer_mail = session?.user?.email
    const cost = Number(price)
    const name = customer_name
    const product_id = id
    const product_name = title
    const thumbnail = image
    const item = {
        thumbnail,
        product_name,
        cost,
        product_id,
        name,
        customer_id,
        customer_mail
    }
    const AddItemToCart = () => {
        document.getElementById(id).innerHTML = "Adding item to cart..."
        function saveItem() {
            fetch("/api/addItem", {
                method: "POST",
                body: JSON.stringify(item)
            }).then(() => {
                document.getElementById(id).innerHTML = "Item added to cart"
            }).catch(() => {
                document.getElementById(id).innerHTML = "Error"
            })
            return true
        }
        saveItem()
    }
    return(
        <div className="max-w-[300px] flex flex-col items-center justify-center -space-y-2">
            <div>
                <Link href={`/items/${slug}`}>
                    <a>
                        <div className="rounded-t-xl"><Image src={image} width={300} height={175} className="rounded-t-xl" /></div>
                    </a>
                </Link>
            </div>
            <div className="bg-green rounded-b-xl">
                <Link href={`/items/${slug}`}>
                    <a>
                        <div>
                            <p className="w-full p-2 text-base font-semibold text-center text-white">{description}</p>
                        </div>
                    </a>
                </Link>
                {
                    session?.user.name && (
                        <button className="bg-ash text-white p-2.5 my-2.5 mx-2 w-64 rounded-full" id={id} onClick={AddItemToCart}>Add to cart</button>
                    ) 
                }
            </div>
        </div>
    )
}

export default RecommendedCard