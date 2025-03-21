import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { AttachmentRepository } from '@/domain/forum/application/repositories/attachments-repository'

export class InMemoryAttachmentsRepository implements AttachmentRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment): Promise<void> {
    this.items.push(attachment)
  }
}
