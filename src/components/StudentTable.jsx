import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export default function StudentTable({ initialData }) {
  // Initialize students as an array
  const [students, setStudents] = useState(initialData || []);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Update students whenever initialData changes
  useEffect(() => {
    if (Array.isArray(initialData)) {
      setStudents(initialData);
    } else {
      console.error("initialData is not an array:", initialData);
    }
  }, [initialData]);

  const handleSendNotification = (student) => {
    alert(`Notification sent to ${student.name} regarding pending fees.`);
  };

  const handleMarkAsPaid = (student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const confirmMarkAsPaid = () => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? { ...s, feeStatus: "Paid", remainingFeesAmount: 0 }
          : s
      )
    );
    setDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedStudent(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ margin: 4 }}>
        <Typography variant="h6" sx={{ padding: 2 }}>
          Student Fee Status
        </Typography>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Fee Status</TableCell>
              <TableCell>Remaining Fees</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.semester}</TableCell>
                <TableCell
                  sx={{
                    color: student.feeStatus === "Paid" ? "green" : "red",
                    fontWeight: 500,
                  }}
                >
                  {student.feeStatus}
                </TableCell>
                <TableCell>₹{student.remainingFeesAmount}</TableCell>
                <TableCell>
                  {student.feeStatus === "Unpaid" && (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => handleSendNotification(student)}
                        sx={{ mr: 1 }}
                      >
                        Notify
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={() => handleMarkAsPaid(student)}
                      >
                        Mark as Paid
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark{" "}
            <strong>{selectedStudent?.name}</strong>'s fees as paid? This will
            set the remaining fee amount to ₹0.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={confirmMarkAsPaid}
            color="success"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
