import CryptoJS from 'crypto-js'

export class ChecksumService {
  async sha256(file: File): Promise<string> {
    let sha256 = CryptoJS.algo.SHA256.create()
    const sliceSize = 10_485_760 // 10 MiB
    let start = 0

    while (start < file.size) {
      const slice: Uint8Array = await this.readSlice(file, start, sliceSize)
      const wordArray = CryptoJS.lib.WordArray.create(slice as unknown as number[])
      sha256 = sha256.update(wordArray)
      start += sliceSize
    }

    return sha256.finalize().toString()
  }

  private async readSlice(file: File, start: number, size: number): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      const fileReader = new FileReader()
      const slice = file.slice(start, start + size)

      fileReader.onload = () => resolve(new Uint8Array(fileReader.result as any))
      fileReader.onerror = reject
      fileReader.readAsArrayBuffer(slice)
    })
  }
}
