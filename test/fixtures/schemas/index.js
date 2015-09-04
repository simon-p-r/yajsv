// Load modules
var Address = require('./definitions/address.js');
var Amt = require('./definitions/amt.js');
var Content = require('./definitions/content.js');
var Context = require('./definitions/context.js');
var Control = require('./definitions/control.js');
var County = require('./collections/county.js');
var DbRef = require('./definitions/dbRef.js');
var Device = require('./collections/device.js');
var EventLog = require('./collections/eventLog.js');
var Feature = require('./collections/feature.js');
var File = require('./definitions/file.js');
var Func = require('./collections/function.js');
var GbsInstance = require('./collections/gbsInstance.js');
var Honorific = require('./records/honorific.js');
var Lookup = require('./collections/lookup.js');
var LuRef = require('./definitions/luRef.js');
var Mime = require('./records/mimeType.js');
var Note = require('./definitions/note.js');
var Permission = require('./definitions/permission.js');
var Screen = require('./collections/screen.js');
var SourceFile = require('./definitions/sourceFile.js');
var SystemConfig = require('./collections/systemConfig.js');
var Uk = require('./records/uk.js');


module.exports = {

    address: Address,
    amt: Amt,
    content: Content,
    context: Context,
    control: Control,
    county: County,
    dbRef: DbRef,
    device: Device,
    eventLog: EventLog,
    feature: Feature,
    file: File,
    func: Func,
    gbs: GbsInstance,
    honorific: Honorific,
    lookup: Lookup,
    luRef: LuRef,
    mimeType: Mime,
    note: Note,
    permission: Permission,
    screen: Screen,
    sourceFile: SourceFile,
    systemConfig: SystemConfig,
    uk: Uk


};
