import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('documents') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    const results = [];

    // Process each file individually as FastAPI expects single file upload
    for (const file of files) {
      try {
        const fileFormData = new FormData();
        fileFormData.append('file', file);

        const backendResponse = await fetch(`${backendUrl}/api/v1/upload`, {
          method: 'POST',
          body: fileFormData,
        });

        const responseData = await backendResponse.json();

        if (!backendResponse.ok) {
          results.push({
            filename: file.name,
            success: false,
            error: responseData.detail || 'Upload failed'
          });
        } else {
          results.push({
            filename: responseData.filename,
            success: responseData.success,
            message: responseData.message,
            documents_added: responseData.documents_added,
            file_type: responseData.file_type
          });
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        results.push({
          filename: file.name,
          success: false,
          error: 'Upload failed'
        });
      }
    }

    // Transform to match expected frontend response
    const successfulUploads = results.filter(r => r.success);
    const failedUploads = results.filter(r => !r.success);

    return NextResponse.json({
      success: successfulUploads.length > 0,
      message: `${successfulUploads.length} file(s) uploaded successfully, ${failedUploads.length} failed`,
      processed_urls: successfulUploads.map(r => r.filename),
      failed_urls: failedUploads.map(r => r.filename)
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
