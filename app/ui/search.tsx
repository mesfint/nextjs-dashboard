'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  
  //This useDebouncedCallback function will wrap the contents of handleSearch, and only 
  //run the code after a specific time once the user has stopped typing (300ms).
  
  const handleSearch =useDebouncedCallback((term:string)=>{
    
    const params = new URLSearchParams(searchParams)
    //URLSearchParams is a Web API that provides utility methods
    // for manipulating the URL query parameters.
    //Next, set the params string based on the user’s input.
    // If the input is empty, you want to delete it:
    //when the user types a new search query, you want to reset the page number to 1
    params.set('page', '1');

    console.log(`Searching... ${term}`);


    if(term){
      params.set('query',term)
    }else{
      params.delete('query')
    }
    //${pathname} is the current path, in your case, "/dashboard/invoices".
//As the user types into the search bar, params.toString() translates
// this input into a URL-friendly format.
//replace(${pathname}?${params.toString()}) updates the URL with the user's
// search data. For example, /dashboard/invoices?query=lee if the user searches for "Lee".
//defaultValue vs. value / Controlled vs. Uncontrolled

    replace(`${pathname}?${params.toString()}`);

    console.log(pathname,params)


  },300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e)=>{handleSearch(e.target.value)}}
        defaultValue={searchParams.get('query')?.toString()}

      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
