var AudioAnalyzer = AudioAnalyzer || {}

AudioAnalyzer =  {

    init: function(audio){
        this.context = new AudioContext();
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = 2048;
        this.setUpSource(audio.song);
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.averageFrequency = 1;
    },
    getFrequencyData: function(){
        this.analyser.getByteFrequencyData(this.dataArray);
        var averageFrequency
        for (var i = 0; i < this.bufferLength; i++) {
            this.averageFrequency += this.dataArray[i];
        };
        averageFrequency = this.averageFrequency / this.bufferLength;
        return averageFrequency;
    },
    setUpSource: function(audio) {
        if (audio) {
            this.source = this.context.createMediaElementSource(audio);
            this.source.connect(this.context.destination);
            this.source.connect(this.analyser);
        }
    }
}

module.exports = AudioAnalyzer;
