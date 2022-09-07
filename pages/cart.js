import { TrashIcon } from "@heroicons/react/outline"
import Image from "next/image"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import Head from "next/head"
import { sanityClient } from "../sanity"

const Cart = ({ data }) => {
    const increase = () => {

    }
    return(
        <div>
            <Head>
                <title>igowithIGHO Art Sale</title>
                <meta name="description" content="igowithIGHO Art Sale" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <Navbar page={""} />
            <div className="absolute inset-x-0 top-0 h-full mt-24 bg-lightBg">
                <main className="space-y-8 bg-white">
                    {
                        //cart and checkout
                    }
                    <div className="flex justify-center px-2.5 sm:px-16 pt-10">
                        <div className="flex flex-col w-full space-x-0 space-y-5 md:flex-row md:space-y-0 md:space-x-5 md:max-w-4xl">
                            <div className="flex flex-col flex-1 bg-white md:max-w-md border-2 border-lightBg">
                                <h1 className="py-4 text-lg font-semibold px-2.5">Cart</h1>
                                <div className="h-[2px] bg-lightBg space-y-2" />
                                    <div className="p-2.5 space-y-4">
                                    {
                                        //cart item
                                    }
                                    {
                                        data.map(info => (
                                            <div className="flex items-center justify-between w-full space-x-2.5" key={info.product_id}>
                                                <div>
                                                    <Image src={info.thumbnail} width={75} height={75} className="rounded-xl" />
                                                </div>
                                                <div className="flex flex-col flex-wrap items-start flex-1 space-y-1">
                                                    <h1 className="max-w-[235px] break-words font-semibold">{info.product_name}</h1>
                                                    <div className="flex items-center justify-between w-full">
                                                        <div>
                                                            <div className="flex items-center border-2 max-w-auto rounded-xl border-green max-w-[100px]">
                                                                <button className="w-8 text-2xl font-semibold text-center" onClick={() => {
                                                                    let item = document.getElementById(info.product_id)
                                                                    let val = Number(item?.value)
                                                                    if (val > 1) {
                                                                        val -= 1
                                                                    }
                                                                    item.value = val
                                                                    let price = 100 * val
                                                                    item.value = val
                                                                    const priceId = info.product_id+"price"
                                                                    document.getElementById(priceId).innerHTML = "= $" + price
                                                                }}>-</button>
                                                                <input type="text" value="1" id={info.product_id} className="w-8 text-center text-black border-2 outline-none border-x-green border-y-white" readOnly />
                                                                <button className="w-8 text-2xl font-semibold text-center" onClick={() => {
                                                                    let item = document.getElementById(info.product_id)
                                                                    let val = Number(item?.value)
                                                                    val += 1
                                                                    item.value = val
                                                                    let price = 100 * val
                                                                    item.value = val
                                                                    const priceId = info.product_id+"price"
                                                                    document.getElementById(priceId).innerHTML = "= $" + price
                                                                }}>+</button>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button>
                                                                <TrashIcon className="w-8 h-8" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {
                                                        //create a unique id by joining the unique id with string price
                                                    }
                                                    <button className="text-lg font-semibold" id={`${info.product_id}price`}>= ${info.cost}</button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {
                                        //cart item ends here
                                    }
                                </div>
                            </div>
                            <div className="flex-1 bg-white max-h-[270px] p-2.5 border-2 border-lightBg space-y-1.5">
                                <h1 className="py-4 text-lg font-semibold">CART SUMMARY</h1>
                                <div className="h-[2px] bg-lightBg space-y-2" />
                                <div className="flex justify-between">
                                    <h2 className="text-base font-semibold py-2.5">Subtotal</h2>
                                    <h2 className="text-base font-semibold py-2.5">$200</h2>
                                </div>
                                <p className="text-xs">Your full address should contain your state and country</p>
                                <input type="text" placeholder="Enter your full house address" className="p-2.5 border border-lightBg w-full outline-none" />
                                <button className="w-full text-lg font-semibold text-white bg-green p-2.5">Checkout $200</button>
                            </div>
                        </div>
                    </div>
                    <Newsletter />
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default Cart

export async function getServerSideProps(context) {
    const id = context?.query?.user 
    const query = `
        *[_type == "cart" && customer_id == "${id}"]{
            thumbnail,
            product_name,
            cost,
            product_id,
            name,
            customer_id,
            customer_mail
        }
    `
    const data = await sanityClient.fetch(query)
    return {
        props: {
            data
        }
    }
}