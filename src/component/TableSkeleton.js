export const TableSkeleton = ({ rows = 5, cols = 4 }) => {
    return (
        <tbody>
            {[...Array(rows)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                    {[...Array(cols)].map((_, colIndex) => (
                        <td key={colIndex} style={{ padding: "16px 5px", textAlign: "center" }}>
                            <div className="skeleton" />
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};
