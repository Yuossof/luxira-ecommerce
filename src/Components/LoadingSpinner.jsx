
const LoadingSpinner = (props) => {
    // eslint-disable-next-line react/prop-types
const { w = 5, h = 5, forRoute=false} = props
    if(forRoute) {
        return (
                <div className="w-full h-full flex justify-center items-center mt-24">
                    <div style={{width:w, height:h}} className={`border-2 border-t-slate-700 animate-spin rounded-full`}></div>
                </div>
            
        )
    }

    return (
        <div style={{width:w, height:h}} className={`border-2 border-t-slate-700 animate-spin rounded-full`}></div>
    )
}

export default LoadingSpinner