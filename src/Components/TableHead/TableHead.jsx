const TableHead = ({ isDisabled , isAllSelected , HandleSelectAll}) => {

  return (
            <thead>
                <tr  >
                    <th>
                        <input id="checkAll" disabled={isDisabled} type="checkbox" checked={isAllSelected} onChange={HandleSelectAll} />
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
  )
}

export default TableHead;
