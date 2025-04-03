
interface comparisonTypes {
    compareFrom: number,
    compareTo: number,
    name: string,
}

export default function Comparison({compareFrom,compareTo,name} : comparisonTypes) {
    return (<div>
        {compareFrom/compareTo} {name}
    </div>)
}