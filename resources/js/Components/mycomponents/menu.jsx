import React from 'react'
import { Link, Head } from "@inertiajs/react";

function menu() {
  return (
    <div>
        <div>
            <Link href={route("welcome")}>top 250 movie</Link>
            <Link href={route("welcome")}>browse movie by gender</Link>
        </div>
        <div>
            <Link href={route("welcome")}>top 250 tv show</Link>
            <Link href={rounte("welcome")}>browe tv shows by gender</Link>
        </div>
    </div>
  )
}

export default menu
