import { useState } from "react";
import { Shield, Scan, Link2, QrCode, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScanResult {
  url: string;
  status: 'safe' | 'warning' | 'danger';
  score: number;
  details: string;
}

const SecurityScanner = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async () => {
    if (!inputUrl.trim()) return;
    
    setScanning(true);
    setResult(null);
    
    // Mock scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result based on URL content
    const mockResult: ScanResult = {
      url: inputUrl,
      status: inputUrl.includes('malicious') ? 'danger' : 
              inputUrl.includes('suspicious') ? 'warning' : 'safe',
      score: inputUrl.includes('malicious') ? 15 : 
             inputUrl.includes('suspicious') ? 75 : 95,
      details: inputUrl.includes('malicious') ? 'Malicious content detected' :
               inputUrl.includes('suspicious') ? 'Potentially suspicious activity' :
               'No threats detected'
    };
    
    setResult(mockResult);
    setScanning(false);
  };

  const handleQRScan = () => {
    // Mock QR scan functionality
    setInputUrl("https://example.com/scanned-qr-link");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="h-5 w-5 text-success" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'danger': return <XCircle className="h-5 w-5 text-destructive" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'success';
      case 'warning': return 'warning';
      case 'danger': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-4 shadow-glow">
            <Shield className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            SecureLink Scanner
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Protect yourself from malicious links and QR codes. Get instant security analysis powered by VirusTotal.
          </p>
        </div>

        {/* Scanner Interface */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="h-5 w-5 text-primary" />
              URL Security Scanner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Manual URL Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  Enter URL to scan
                </label>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="bg-input/50"
                />
              </div>

              {/* QR Code Scanner */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  Scan QR Code
                </label>
                <Button 
                  variant="outline" 
                  onClick={handleQRScan}
                  className="w-full border-primary/30 hover:border-primary"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Open QR Scanner
                </Button>
              </div>
            </div>

            {/* Scan Button */}
            <Button
              onClick={handleScan}
              disabled={!inputUrl.trim() || scanning}
              className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow"
              size="lg"
            >
              {scanning ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                  Scanning...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Analyze Security
                </>
              )}
            </Button>

            {/* Scanning Animation */}
            {scanning && (
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div className="absolute inset-y-0 w-full bg-gradient-scanner animate-scan-line" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className={`border-2 ${
            result.status === 'safe' ? 'border-success/50 shadow-success' :
            result.status === 'warning' ? 'border-warning/50' :
            'border-destructive/50 shadow-danger'
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(result.status)}
                  Security Analysis Complete
                </div>
                <Badge variant={getStatusColor(result.status) as any}>
                  Score: {result.score}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Analyzed URL:</p>
                <p className="font-mono text-sm break-all">{result.url}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Security Score</span>
                    <span className="font-medium">{result.score}/100</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        result.status === 'safe' ? 'bg-gradient-success' :
                        result.status === 'warning' ? 'bg-warning' :
                        'bg-gradient-danger'
                      }`}
                      style={{ width: `${result.score}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{result.details}</p>

              {result.status === 'safe' && (
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Safe to proceed</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real-time Protection</h3>
              <p className="text-sm text-muted-foreground">
                Instant security analysis using VirusTotal's comprehensive database
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <QrCode className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">QR Code Scanner</h3>
              <p className="text-sm text-muted-foreground">
                Safely scan QR codes and analyze their destinations
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Scan className="h-12 w-12 text-warning mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Detailed Reports</h3>
              <p className="text-sm text-muted-foreground">
                Get comprehensive security insights and threat analysis
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecurityScanner;