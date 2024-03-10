import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Component to render the invoice as a PDF
const InvoicePDF = () => {
  // Styles for PDF
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <PDFViewer width="100%" height="600px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Invoice ID: 123</Text>
            <Text>Customer Name: Dhruv</Text>
            <Text>Customer Email: pragati@gmail</Text>
            <Text>Phone No: 123456788</Text>
            {/* Add more static text as needed */}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default InvoicePDF;