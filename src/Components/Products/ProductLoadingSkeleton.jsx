
const ProductLoadingSkeleton = () => {
    return (
        <div>
            <div className="p-4 shadow-main rounded-md border-[1px] border-slate-200 animate-pulse">
                <div className="flex items-center justify-center relative">
                    <div className='absolute right-[20px] top-[10px] bg-slate-200 rounded-full w-[30px] h-[30px]' />
                    <div className='w-full aspect-square bg-slate-200 rounded-md'></div>
                </div>
                <div className="p-2 flex flex-col gap-2">
                    <div className='h-[20px] bg-slate-200 rounded w-3/4'></div>
                    <div className='flex items-center gap-2'>
                        <div className='h-[20px] w-[50px] bg-slate-200 rounded'></div>
                        <div className='flex gap-[2px]'>
                            <div className='w-4 h-4 bg-slate-200 rounded-full'></div>
                            <div className='w-4 h-4 bg-slate-200 rounded-full'></div>
                            <div className='w-4 h-4 bg-slate-200 rounded-full'></div>
                            <div className='w-4 h-4 bg-slate-200 rounded-full'></div>
                            <div className='w-4 h-4 bg-slate-200 rounded-full'></div>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <div className='w-4 h-4 rounded-full bg-slate-200'></div>
                        <div className='w-4 h-4 rounded-full bg-slate-200'></div>
                        <div className='w-4 h-4 rounded-full bg-slate-200'></div>
                    </div>
                </div>
                <div className='bg-slate-200 w-full mt-3 rounded-md h-[40px]'></div>
            </div>
        </div>
    )
}

export default ProductLoadingSkeleton