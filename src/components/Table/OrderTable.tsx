import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { OrderData } from "@/interface";

export default function OrderTable(props: { orderData: Array<OrderData>, count: number }) {
    return (
        <TableContainer component={Paper}>
            <Table padding="checkbox" sx={{ minWidth: 500 }} aria-label="caption table">
                <caption>Order Book</caption>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "GrayText" }}>
                        <TableCell >Count</TableCell>
                        <TableCell >Amount</TableCell>
                        <TableCell >Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.orderData.length > 0 ? props.orderData.map((row: OrderData, index: number) => (
                            <TableRow key={index}>
                                <TableCell key={`count${index}`}>{row.count}</TableCell>
                                <TableCell key={`amount${index}`}>{row.amount}</TableCell>
                                <TableCell key={`price${index}`}>{row.price}</TableCell>
                            </TableRow>
                        )) : null
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}